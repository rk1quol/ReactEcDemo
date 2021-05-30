import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/src/no_image.png'
import {push} from 'connected-react-router'
import {useDispatch} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {deleteProduct} from "../../reducks/products/operations";


const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(100%/3 - 32px)',
    },
  },
  content: {
    display: 'flex',
    padding: '16px 8px',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16
    }
  },
  media: {
    height: 0,
    paddingTop: '100%',

  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  }
}));

const ProductCard = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = (e) => {
    setAnchorEl(null)
  }

  const price = props.product.price.toLocaleString()
  const images = props.product.images.length > 0 ? props.product.images : [{path: NoImage}]

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={images[0].path}
        title="Contemplative Reptile"
        onClick={() => dispatch(push(`/product/${props.product.id}`))}
      />
      <CardContent className={classes.content}>
        <div>
          <Typography color="textSecondary" component="p">
            {props.product.name}
          </Typography>
          <Typography component="p" className={classes.price}>
            ¥{price}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
         <MenuItem
           onClick={() => {
             dispatch(push(`/product/edit/${props.product.id}`))
             handleClose()
           }}
         >編集する</MenuItem>
         <MenuItem
           onClick={() => {
             dispatch(deleteProduct(props.product.id))
           }}
         >削除する</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}

export default ProductCard

