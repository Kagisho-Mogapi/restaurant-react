import React,{useState, useEffect} from 'react'
import {createAPIEndpoint, ENDPOINTS} from '../../api';
import { IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(theme =>({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput:{
        marginLeft: theme.spacing(1.5),
        flex: 1,
    },
    ListRoot:{
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover':{
            cursor: 'pointer',
            backgroundColor: 'E3E3E3'
        },
        '& li:hover .MuiButtonBase-root':{
            display: 'block',
            color: '#000'
        },
        '& .MuiButtonBase-root':{
            display: 'none'
        },
        '& .MuiButtonBase-root:hover':{
            backgroundColor: 'transparent'
        }
    }
}))


export default function SearchFoodItem(props) {

    const {addFoodItem} = props

    const [foodItems, setFoodItems] = useState([])
    const classes = useStyles()
    const [searchKey, setSearchKey] = useState('')
    const [searchList,setSearchList] = useState([])

    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.FOODITEM).fetchAll()
        .then(res => {
            setFoodItems(res.data)
            setSearchList(res.data)
        })
        .catch(err => console.log(err))
    },[])

    useEffect(()=>{
        let x = [...foodItems];
        x = x.filter(y =>{
            return y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
        })

        setSearchList(x)
    },[searchKey])


  return (
    <>
    <Paper className={classes.searchPaper}>
        <InputBase 
            placeholder='Search food item' 
            className={classes.searchInput}
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
        />
        <IconButton >
            <SearchIcon />
        </IconButton>
    </Paper>
    <List className={classes.ListRoot}>
        {
            searchList.map((item,idx) =>(
                <ListItem key ={idx}>
                    <ListItemText 
                        primary={item.foodItemName} 
                        secondary={'R'+item.price}
                    />
                        <ListItemSecondaryAction>
                            <IconButton onClick={e => addFoodItem(item)}>
                                <PlusOneIcon/>
                                <ArrowForwardIosIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                </ListItem>
            ))
        }
    </List>
    </>
  )
}
