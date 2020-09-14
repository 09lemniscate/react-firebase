import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Menu, Dropdown } from 'semantic-ui-react';
import firebase from '../../firebase';


const ChartPanel = () => {
    const [chartData, setChartData] = useState({})
    const chart = (data) => {
        const monthlyRevenue = data['monthlyValue'];
        const country = data['country']
        const company = data['name']
        setChartData({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octobr', 'November', 'December'],
            datasets: [
                {
                    label: `Monthly Revenue Company:${company} in ${country}`,
                    data: monthlyRevenue,
                    borderWidth: 4,
                    backgroundColor: ['red','blue','green','black','yellow','grey','violet','pink','red','blue','orange','indigo']
                }
            ],
        })
    }
    const languageOptions = [
        { key: '0', text: 'USA', value: 'USA' },
        { key: '1', text: 'India', value: 'India' },
        { key: '2', text: 'UK', value: 'UK' },
        { key: '4', text: 'Sweden', value: 'Sweden' },
    ]
    const layoutOptions = [
        { key: '0', text: 'Line', value: 0 },
        { key: '1', text: 'Doughnut', value: 1 },
    ]
    const [country, setCountry] = useState('USA');
    const [company, setCompany] = useState('Facebook');
    const [companyList, setCompanyList] = useState([])
    const [layout, setLayout] = useState(0);

    const handleDropdown = (event, { value }) => {
        setCountry(value);
        console.log(value,country)
        setCompanyList([]);
        setCompany('');
        getCompaniesByCountry(value);
    }
    const handleDropdownCompany = (event, { value }) => {
        setCompany(event.target.textContent);
    }
    const getChartData = () => {
        console.log(company,country)
        firebase.getDB().collection(country).doc(company).get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                chart(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    const getCompaniesByCountry = async (country = 'USA') => {
        console.log(country,'country')
        const events = await firebase.getDB().collection(country)
        events.get().then((querySnapshot) => {
            const tempDoc = []
            querySnapshot.forEach((doc) => {
                tempDoc.push({ key: doc.id, value: doc.id, text: doc.data().name })
            })
            setCompanyList(tempDoc);
        })
    }

    useEffect(() => {
        if(company){
            getChartData()
        }
    }, [company])
    useEffect(() => {
        getCompaniesByCountry()
    }, [])
    return (
        <div>
            <Menu secondary style={{paddingTop:'2rem',paddingBottom:'2rem'}}>
                <Dropdown
                    button
                    className='icon'
                    floating
                    labeled
                    icon='world'
                    options={languageOptions}
                    selection
                    defaultValue={country}
                    onChange={handleDropdown}
                    placeholder='Select Country'
                />
                <Dropdown
                    button
                    className='icon'
                    floating
                    labeled
                    icon='cloud'
                    options={companyList}
                    selection
                    defaultValue={company}
                    onChange={handleDropdownCompany}
                    placeholder='Select Company'
                />
                <Menu.Menu position='right'>
                <Dropdown
                    button
                    className='icon'
                    floating
                    labeled
                    icon='list layout'
                    options={layoutOptions}
                    selection
                    defaultValue={layout}
                    onChange={(e,{value})=>setLayout(value)}
                    placeholder='Select Layout'
                />
                </Menu.Menu>
                
            </Menu>
            <div style={{ width: '800px', minHeight: '300px', margin: 'auto' }}>
                {layout?<Doughnut data={chartData} />:<Line data={chartData}/>}
            </div>
        </div>
    )
}

export default ChartPanel;