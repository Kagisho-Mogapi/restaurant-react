import React from 'react'
import OrderForm from './OrderForm'
import { useForm } from '../../hooks/useForm';
import SearchFoodItem from './SearchFoodItem';
import OrderedFoodItems from './OrderedFoodItems';
import { Grid } from '@material-ui/core';

export default function Order() {

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

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls
} = useForm(getInitModelObject)

  return (
    <Grid container>
      <Grid item xs={12}>
        <OrderForm 
          {...{values, errors, handleInputChange}}
        />
      </Grid>
      
      <Grid item xs={6}>
        <SearchFoodItem/>
      </Grid>
      <Grid item xs={6}>
        <OrderedFoodItems/>
      </Grid>
    </Grid>
  )
}
