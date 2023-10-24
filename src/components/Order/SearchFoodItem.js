import React,{useState, useEffect} from 'react'
import {createAPIEndpoint, ENDPOINTS} from '../../api';
import { IconButton, InputBase, List, ListItem, ListItemText, Paper, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
export default function SearchFoodItem() {

    const [foodItems, setFoodItems] = useState([])

    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.FOODITEM).fetchAll()
        .then(res => {
            setFoodItems(res.data)
        })
        .catch(err => console.log(err))
    },[])

  return (
    <>
    <Paper>
        <InputBase placeholder='Search food item' />
        <IconButton>
            <SearchIcon />
        </IconButton>
    </Paper>
    <List>
        {
            foodItems.map((item,idx) =>(
                <ListItem key ={idx}>
                    <ListItemText primary={item.foodItemName} secondary={'R'+item.price}/>
                </ListItem>
            ))
        }
    </List>
    </>
  )
}
