import Log from './Log.png';
import {DollarSign, ExpandIcon, LayoutDashboard, List, ListCheck, Search} from "lucide-react";


export const assets = {
    Log
}


export const side_Bar_Data = [
    {
        id:"01",
        label:"Dashboard",
        icon:LayoutDashboard,
        path:"/dashboard"
    },


    {
        id:"02",
        label:"Category",
        icon:ListCheck,
        path:"/category"
    },


    {
        id:"03",
        label:"Income",
        icon:DollarSign,
        path:"/income"
    },

    {
        id:"04",
        label:"Expense",
        icon:ExpandIcon,
        path:"/expense"
    },


]