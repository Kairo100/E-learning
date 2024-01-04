import React from 'react'
import MortvertIcon from '@mui/icons-material/MoreVert'
import {CircularProgressbar} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
;
import './Feature.css'
const Feature = () => {
  return (
    <div className='featurecontiner'>
        <div className="topfeature">
            <h1 className='titlefeature'>Total Revenue</h1>
            <MortvertIcon className='smalls'/>
        </div>
        <div className="bottoms">
            <div className="featuredchart">
                <CircularProgressbar value={70} text='70%' strokeWidth={8}/>
            </div>
            <p  className='titlefeature'>total revenue</p>
            <p  className='amounting'>$998,997,653683</p>
            <p  className='desc'>turrrleadungg tui idii itweas otal payment today</p>
        </div>
        <div className="summary">
            <div className="itemsummary">
                <div className="itemsummarytitle">Target</div>
                <div className="itemsummaryresult">
                <KeyboardArrowUpIcon/>
                    <div className="resultamount">$12.9k</div>
                </div>
            </div>
            <div className="itemsummary">
                <div className="itemsummarytitle">Last Weak</div>
                <div className="itemsummaryresult">
                <KeyboardArrowUpIcon/>
                    <div className="resultamount">$12.9k</div>
                </div>
            </div>
            <div className="itemsummary">
                <div className="itemsummarytitle">Last Month</div>
                <div className="itemsummaryresult">
                <KeyboardArrowUpIcon/>
                    <div className="resultamount">$12.9k</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Feature