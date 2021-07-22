import React, { Component } from 'react';
import {
  getFromStorage,
  deleteFromStorage
} from '../utils/storage/storage.js';
import { Redirect } from "react-router-dom";


export default class UserPage extends Component {
    constructor(props){
        super(props);
        this.state={
            tweetLink: '',
            isLoading: true,
            linkError: '',
            tweetText: '',
            isFake: '',
            token: null
        }
        this.onTextboxChangetweetLink = this.onTextboxChangetweetLink.bind(this);
        this.logout= this.logout.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    render(){
       const {token, isLoading, isFake,linkError}=this.state
      var buttonClassName='button is-primary'
      var fakeTextClass="is-size-5 mt-2"
      var resultText="81% sure this Tweet is"
      var inputClass="input mt-5"
      if (isLoading){
        buttonClassName+=" is-loading"
      }
      if (linkError){
        inputClass+=" is-danger"
      }
      if (isFake==="0"){
        fakeTextClass+=" has-text-primary"
        resultText+=" not fake"
      }else if (isFake==="1"){
          fakeTextClass+=" has-text-danger"
          resultText+=" fake"
      }
        if (token){
            return(
            <div style={{height: `100vh`}}>
              <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation" style={{display: 'flex',height: `10vh`}}>
                <div className="navbar">
                  <a className="navbar-item">
                    <img src="https://xinslu.github.io/icon3.png" height="auto" width="50" />
                  </a>
                </div>
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons">
                      <a className={buttonClassName} onClick={this.logout}>
                        <strong>Log Out</strong>
                      </a>
                    </div>
                  </div>
                </div>
              </nav>
              <div>
                <div style={{display: 'block',paddingTop: `8%`, marginLeft: `3%`}}>
                  <p className="is-family-sans-serif is-size-2">Welcome!</p>
                  <p className="is-family-sans-serif is-size-6 mt-2" style={{marginRight: `3%`,textAlign: 'justify', textJustify: 'inter-word'}}>Disaster Tweets are tweets which talk of a disaster that took place. While most Disaster Tweets are accurate, some, on the other hand, seek to be sensationalistic and attention-grabbing and write fake disasters that never took place in hopes of getting some more followers or being social media famous. While their intentions are naive, the impact it spreads is not. Mass Panic and hysteria is a common consequence of this.
                  Find out whether a tweet is fake by entering the URL below!</p>
                  {(this.state.isFake) ? (<p className={fakeTextClass} style={{textAlign: 'center'}}>{resultText}</p>):(null)}
                </div>
              <div style={{justifyContent: 'center', textAlign: 'center'}}>
                <input style={{width: `50%`}} className={inputClass} type="text" placeholder="Paste the Tweet Link Here" value={this.state.tweetLink} onChange={this.onTextboxChangetweetLink}/>
                {(linkError)? (<p className="help is-danger">Cannot be blank</p>):(null)}
              </div>
              <div class="field mt-3" style={{justifyContent: 'center'}}><button type="button" onClick={this.onSubmit} className={buttonClassName} style={{width: `30%`,left: `35%`}}>Find Out if it is a Fake Tweet</button></div>
              </div>
            </div>
            )
        }else if (!isLoading && !token){
          console.log('in login')
            return (<Redirect to="/login" />)
        }else{
          return (<Redirect to="/home" />)
        }
    }
    onTextboxChangetweetLink(event) {
      if (event.target.value){
        this.setState({
        tweetLink: event.target.value
      });
      }
    }
    async onSubmit(){
      const {tweetLink}=this.state
      this.setState({
      isLoading: true,
    });
      const tweetID=tweetLink.split("/")[5]
      var res= await fetch('http://localhost:5000/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: tweetID
      }),
    })
      const jsonData=await res.json()
      if (jsonData.success){
        this.setState({tweetText: jsonData.message})
        var predict=await fetch('/predict',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: jsonData.message
          })
        })
        const jsonData2=await predict.json()
        this.setState({
          isFake: jsonData2.value,
          isLoading: false
        })
      }else{
        this.setState({
          linkError: jsonData.message,
          isLoading: false
        })
      }
    }

    async logout() {
        this.setState({
          isLoading: true,
        });
        const { token } = this.state;
        const res= await fetch('/logout?token=' + token)
        const jsonData=await res.json()
        if (jsonData.success) {
          deleteFromStorage()
          this.setState({
            token: '',
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
    }

    async componentDidMount(){
       const obj = getFromStorage('SESS_ID');
      if (obj && obj.token) {
        const { token } = obj;
        const res= await fetch('http://localhost:5000/verify?token=' + token)
        const jsonData=await res.json()
        if (jsonData.success) {
          await this.setState({
            token:token,
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

}

