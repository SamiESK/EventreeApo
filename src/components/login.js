import React from 'react'
import { Navbar } from 'reacthalfmoon';
import { NavbarContent } from 'reacthalfmoon';
import { NavbarBrand } from 'reacthalfmoon';
import { NavItem } from 'reacthalfmoon';
import { NavbarNav } from 'reacthalfmoon';
import { Img } from 'reacthalfmoon';
import { DarkmodeSwitch } from 'reacthalfmoon';
import { useState } from 'react';
import { setDarkmode } from 'react';
import { setIsOpen } from 'react';
import { Button } from 'reacthalfmoon';
import { darkmode } from 'react';
import { PageWrapper } from 'reacthalfmoon';
import { Form } from 'reacthalfmoon';
import { FormGroup } from 'reacthalfmoon';
import { Modal } from 'reacthalfmoon';
import { ModalDialog } from 'reacthalfmoon';
import { ModalTitle} from 'reacthalfmoon';
import { ModalContent } from 'reacthalfmoon';


function NavBar()
{
    const [isOpen, setIsOpen] = useState(false);

    const app_name = "eventree-calendar";
    function buildPath(route) {
        if (process.env.NODE_ENV === "production") {
            return "https://" + app_name + ".herokuapp.com/" + route;
        } else {
            return "http://localhost:5000/" + route;
        }
    }

    var email;
    var password;

    const doLogin = async (event) => {
        event.preventDefault();

        var obj = { email: email.value, password: password.value };
        var js = JSON.stringify(obj);
       
        try {
            const response = await fetch(buildPath('api/user/login'), {
                method: "POST",
                body: js,
                headers: { "Content-Type": "application/json" },
            });

            var res = JSON.parse(await response.text());
            console.log(res);
            if (!res.token) {
                document.getElementById("loginError").innerHTML = res.error;
            }
            else if(res.token) {
                document.getElementById("loginError").innerHTML = "";
                console.log(res);
                
                localStorage.setItem('token', res.token);
                localStorage.setItem('firstName', res.firstName);
                localStorage.setItem('lastName', res.lastName);
                localStorage.setItem('email', res.email);
                window.location.href = "/HomePage"; 
            }
            
            
        } catch (e) {
            alert(e.toString());
            return;
        }
    };

    const redirect = async (event) => {
        event.preventDefault();
        window.location.href = "/ResetPage";
    };
};
export default NavBar;