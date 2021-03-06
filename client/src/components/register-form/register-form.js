import React, {Component} from 'react';
import axios from 'axios';
import './register-form.css';
import { Redirect } from 'react-router-dom';
import Navbar from './../navbar/navbar';
import {Route, Link} from 'react-router-dom';
import store from 'store';
import {geolocated} from 'react-geolocated';
//var store = require('store');

class Registerform extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            passrep: '',
            description: '',
            linkedInUrl: '',
            role: '',
            skill: ''
        }
    }


    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    }
    
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handlePassRepChange = (e) => {
        this.setState({passrep: e.target.value});
    }

    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value});
    }

    handleLinkedInChange = (e) => {
        this.setState({linkedInUrl: e.target.value});
    }
    
    handleRoleChange = (e) =>{
        this.setState({role: e.target.value});
    }
    
    handleSkillChange = (e) =>{
        this.setState({skill: e.target.value});
    }
    submitData = (e) => {
        e.preventDefault();
        //console.log(this.props.coords.latitude);
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role:this.state.role,
            skill:this.state.skill.replace(/\s/g, '').toLowerCase().split(','),
            description: this.state.description,
            linkedInUrl: this.state.linkedInUrl,
            pos: [77.3715726, 28.5113011]
        }
        
        //console.log(user);
        axios.post("user/register", user).then(res => {
            const {history} = this.props;
            console.log(res.data);
            if(res.data.success){
                store.set('loggedIn', true);
                store.set('id', res.data.data._id);
                history.push('/maps');
            }
        });
    }

    render(){
        return(
            <div>
                <Navbar />
            
            <div className="register-photo">
                <div className="form-container">
                    <div className="image-holder"></div>
                    <form onSubmit={this.submitData}>
                        <h2 className="text-center"><strong>Create</strong> an account.</h2>
                        <div className="form-group">
                            <input className="form-control" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} required />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" name="name" placeholder="Name"  onChange={this.handleNameChange} required/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" name="password" placeholder="Password"  onChange={this.handlePasswordChange} required/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" name="password-repeat" placeholder="Password (repeat)"  onChange={this.handlePassRepChange} required/>
                        </div>
                        
                        <div className="form-group">
                            <input className="form-control" type="text" name="description" placeholder="Describe Yourself"  onChange={this.handleDescriptionChange} required/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" name="skill" placeholder="Enter your skills(use , to separate)"  onChange={this.handleSkillChange} required/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" name="LinkedIn" placeholder="LinkedIn Profile Link" onChange={this.handleLinkedInChange} />
                        </div>
                        <div className="form-group">
                        <p>Choose if you are a Student or a Professional:</p>
      
                            <ul class="list">
                            <li>
                            <label>
                                <input
                                type="radio"
                                value="Student"
                                checked={this.state.role === "Student"}
                                onChange={this.handleRoleChange}
                                required
                                />
                                Student
                            </label>
                            </li>
                            <li>
          
                            <label>
                                <input 
                                type="radio"
                                value="Professional"
                                checked={this.state.role === "Professional"}
                                onChange={this.handleRoleChange}
                            />
                             Professional
                            </label>
                            </li></ul>
                            </div>
                        <div className="form-group">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" />I agree to the license terms.
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary btn-block" value="Sign Up" />
                        </div>
                        <Link className="already" to="/login">You already have an account? Login here.</Link>
                        
                    </form>
                </div>
            </div>
            </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true
    },
    watchPosition: true
})(Registerform) 
