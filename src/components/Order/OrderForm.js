import React,{useState, useEffect} from 'react'
import Form from '../Layouts/Form'
import { ButtonGroup, Grid, InputAdornment,makeStyles, Button as MuiButton } from '@material-ui/core'
import Input from '../../controls/Input'
import Select from '../../controls/Select'
import Buttons from '../../controls/Buttons'
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ReorderIcon from '@material-ui/icons/Reorder';
import {createAPIEndpoint, ENDPOINTS} from '../../api';
import { roundTo2DecimalPoint } from '../../Utils'

const pMethods =[
    {id:'none',title:'Select'},
    {id:'Cash',title:'Cash'},
    {id:'Card',title:'Card'},
]



const useStyles = makeStyles(theme =>({
    adornmentText: {
        '& .MuiTypography-root':{
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    submitBtnGrp:{
        backgroundColor: '#f3b33d',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label':{
            textTransform: 'none'
        },
        '&:hover':{
            backgroundColor: '#f3b33d',
        }
    }
}))

export default function OrderForm(props) {

    const {values, setValues, errors, setErrors, handleInputChange, resetFormControls} = props;
    const classes = useStyles()

    const [customerList, setCustomerList] = useState([])

    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchAll()
        .then(res =>{
            let customerList = res.data.map(item =>({
                id: item.customerId,
                title: item.customerName
            }));
            customerList = [{id:0, title: 'Select'}].concat(customerList)
            setCustomerList(customerList)
        })
        .catch(err => console.log(err))
    },[])

    useEffect(()=>{
        let gTotal = values.orderDetails.reduce((tempTotal,item)=>{
            return tempTotal + (item.quantity * item.foodItemPrice)
        }, 0)

        setValues({...values,
            gTotal: roundTo2DecimalPoint(gTotal)})

    },[JSON.stringify(values.orderDetails)])

    const validForm = () =>{
        let temp = {}
        temp.customerId = values.customerId != 0? "": "This field is required"
        temp.pMethod = values.pMethod != "none"? "": "This field is required"
        temp.orderDetails = values.orderDetails.length != 0? "": "This field is required"
        setErrors({...temp})

        return Object.values(temp).every(x => x==="")
    }

    const submitOrder = e =>{
        e.preventDefault()

        if(validForm()){
            createAPIEndpoint(ENDPOINTS.ORDER).create(values)
            .then(res =>{
                resetFormControls()
                console.log(res)
            })
            .catch(err => console.log(err))
        }
    }

  return (
    <Form onSubmit={submitOrder}>
        <Grid container>
            <Grid item xs={6}>
                <Input 
                    disabled 
                    label ="Order Number" 
                    name='orderNumber' 
                    value={values.orderNumber}
                    InputProps ={{
                        startAdornment: <InputAdornment
                            className={classes.adornmentText}
                            position='start'>#</InputAdornment>
                    }}
                />
                <Select 
                    label="Customer" 
                    onChange = {handleInputChange} 
                    name='customerId' 
                    value = {values.customerId} 
                    options={customerList} 
                    error = {errors.customerId}
                />
            </Grid>

            <Grid item xs={6}>
                <Select 
                    label="Payment Method" 
                    onChange = {handleInputChange} 
                    name='pMethod' 
                    value={values.pMethod} 
                    options={pMethods} 
                    error = {errors.pMethod}
                />
                <Input 
                    disabled 
                    label ="Grand Total" 
                    value={values.gTotal} 
                    name='gTotal'
                    InputProps ={{
                        startAdornment: <InputAdornment
                        className={classes.adornmentText}
                            position='start'>$</InputAdornment>
                    }}
                />
                <ButtonGroup className={classes.submitBtnGrp}>
                    <MuiButton size='large' type='submit' endIcon={<RestaurantMenuIcon/>}>Submit</MuiButton>
                    <MuiButton size='small' startIcon={<ReplayIcon/>}/>
                </ButtonGroup>
                <Buttons size='large' startIcon={<ReorderIcon/>}>Orders</Buttons>
            </Grid>
        </Grid>
    </Form>
  )
}
