import React from 'react';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-solid-svg-icons'
import './404.css'

class NotFoundPage extends React.Component {
    constructor(props){
        super(props)
        this.goback=this.goback.bind(this);
    }
    render(){
        return(
            <div style={{backgroundColor: "#5afab2", display: 'flex', textAlign:"center",alignItems: "center", justifyContent:"center", height: `100vh`, width: `100%`}}>
                <div class="notification is-primary is-align-content-center" style={{display: 'flex', flexDirection: 'column' ,height: `60vh`, justifyContent:"center"}}>
                    <p className="is-size-1"><FontAwesomeIcon icon={faFrown} /></p>
                    <p className="is-size-1">404</p>
                    <p className="is-size-4">PAGE NOT FOUND</p>
                    <p className="is-size-5 mt-1">Sorry, We could not locate the resource you requested!</p>
                    <p className="is-size-6">Either <a onClick={this.goback}>go back</a> or go <a href="\">home</a> and choose a new direction. </p>                </div>
            </div>
            )
    }

    goback(){
        return this.props.history.goBack()
    }

}
export default NotFoundPage;
