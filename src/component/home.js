import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  getFromStorage
} from '../utils/storage/storage.js';
import { Redirect} from "react-router-dom";
import 'bulma/css/bulma.min.css';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:''
    }

  };
    render(){
      const {
        token}=this.state

      if (!token){
        return (
          <div style={{backgroundColor: "#5afab2", height: `100vh`}}>
          <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item">
                <img src="https://xinslu.github.io/icon3.png" height="auto" width="50" />
              </a>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary" href="/signup">
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-light" href="/login">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <div style={{display: 'flex',justifyContent: `center`, paddingTop: `10%`, height: `50vh`, width:`57%`,color: "white"}}>
          <p style={{width: `85%`,height: `75vh`, fontFamily: 'Helvetica'}}><h1 className="is-size-1 has-text-weight-bold">Find Fake Tweets in 5 seconds.</h1>
          <h1 className="is-size-1 has-text-weight-bold">Absolutely Free.</h1><h5 className="mt-2" style={{fontSize: '1.20rem'}}>With Twitake, whethere its an obscure tweet from an obscure account or a meme taken too seriously, we'll tell you whether the tweet is fake even from the depths of twitter! </h5></p></div>
          <div className="tile is-ancestor" style={{paddingLeft: `4%`, height: `46%`, width: `100%`,textAlign: 'justify'}}>
            <div className="tile is-vertical is-8">
              <div className="tile">
                <div className="tile is-parent is-horizontal">
                  <article className="tile is-child notification is-primary box" style={{width: `10%`,height: `85%`}}>
                    <p className="title is-size-3">Easy to Use</p>
                    <p className="subtitle mt-1" style={{fontSize: `1.15rem`}}>With Twitake, just login into your account and navigate to the tweet you'd like to test. Twitake uses Twitter API to extract the text from the URL and passes it to the machine learning model to predict whether its true or false.</p>
                  </article>
                </div>
                <div className="tile is-parent is-horizontal">
                  <article className="tile is-child notification is-white box" style={{width: `10%`,height: `85%`}}>
                    <p className="title is-size-3">Accurate</p>
                    <p className="subtitle mt-1" style={{fontSize: `1.15rem`}}>The Natural Language Processing Machine Learning Model is based on effective Data-Processing techinques like Stemming, Lemmatization, tokenization to achieve an accuracy of 81%.</p>
                  </article>
                </div>
                <div className="tile is-parent is-horizontal">
                  <article className="tile is-child notification is-primary box" style={{width: `10%`, height: `85%`}}>
                    <p className="title is-size-3">Convienient</p>
                    <p className="subtitle mt-1" style={{fontSize: `1.15rem`}}>Forget endless searching to verify whether a tweet is true or false, with twitake, just login into your account and paste the link of tweet and let the machine learning model do the rest.</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer" style={{height: `10%`, paddingTop: `0.3rem`}}>
            <div className="content has-text-centered">
              <p>
                <strong>Twitake</strong> by <a href="https://kinshukphalke.com">Kinshuk Phalke</a>.
               </p>
            </div>
          </footer>
          </div>

          )
      }else{
        return (<Redirect to="/login" />)
      }
    }

    async componentDidMount(){
      const obj = getFromStorage('SESS_ID');
      if (obj && obj.token) {
        const { token } = obj;
        const res= await fetch('https://twitake.herokuapp.com/verify?token=' + token)
        const jsonData=await res.json()
        if (jsonData.success) {
          this.setState({
            token:token
          });
        }
      }
  }

}

