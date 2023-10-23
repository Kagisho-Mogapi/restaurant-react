import React,{useState} from 'react'
import Form from '../Layouts/Form'
import { Grid } from '@material-ui/core'
import Input from '../../controls/Input'
import Select from '../../controls/Select'
import Buttons from '../../controls/Buttons'


const pMethods =[
    {id:'none',title:'Select'},
    {id:'Cash',title:'Cash'},
    {id:'Card',title:'Card'},
]

const genOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

const getInitModelObject = () =>({
    orderMasterId: 0,
    orderNumber: genOrderNumber(),
    customerId: 0,
    pMethod: 'none',
    gTotal: 0,
    deletedOrderItemIds:'',
    orderDetails: []
})

export default function OrderForm() {

    const [values,setValues] = useState(getInitModelObject());

    

  return (
    <Form >
        <Grid container>
            <Grid item xs={6}>
                <Input disabled label ="Order Number" name='orderNumber' value={values.orderNumber}/>
                <Select label="Customer" name='customerId' value = {values.customerId} options={[
                        {id:0, title: 'Select'},
                        {id:1, title: 'Customer 1'},
                        {id:2, title: 'Customer 2'},
                        {id:3, title: 'Customer 3'},
                        {id:4, title: 'Customer 4'},
                    ]} />
            </Grid>

            <Grid item xs={6}>
                <Select label="Payment Method" name='pMethod' value={values.pMethod} options={pMethods} />
                <Input disabled label ="Grand Total" value={values.gTotal} name='gTotal'/>
            </Grid>
        </Grid>
    </Form>
  )
}
