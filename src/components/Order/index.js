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

  
const addFoodItem = foodItem =>{
  let x = {
       orderMasterId: values.orderMasterId,
       orderDetailId: 0,
       foodItemId: foodItem.foodItemId,
       quantity:1,
       foodPrice: foodItem.foodPrice,
       foodItemName: foodItem.foodItemName,
  }

  setValues({
    ...values,
    orderDetails: [...values.orderDetails, x]
  })
}

  return (
    <Grid container>
      <Grid item xs={12}>
        <OrderForm 
          {...{values, errors, handleInputChange}}
        />
      </Grid>
      
      <Grid item xs={6}>
        <SearchFoodItem
          {...{addFoodItem}}
        />
      </Grid>
      <Grid item xs={6}>
        <OrderedFoodItems/>
      </Grid>
    </Grid>
  )
}
