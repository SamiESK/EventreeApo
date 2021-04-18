import React from 'react';
import { Form, FormGroup, PageWrapper, ModalDialog, ModalContent, ModalTitle } from 'reacthalfmoon';
import { Button } from 'reacthalfmoon';

function getCode()
{
    var email;

    const app_name = "eventree-calendar-test";
    function buildPath(route) {
        if (process.env.NODE_ENV === "production") {
            return "https://" + app_name + ".herokuapp.com/" + route;
        } else {
            return "http://localhost:5000/" + route;
        }
    }
    
    const resetCode = async (event) => {

        event.preventDefault();
        // if (email.value === null)
        // {
        //     document.getElementById("loginError").innerHTML = "Please put your email in"
        //     return;
        // }
        var obj = { email: email.value};
        
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(buildPath('api/user/password-reset/get-code'), {
                method: "POST",
                body: js,
                credentials : "include"
            });

            var res = JSON.parse(await response.text());
            if (!res.success) {
                // document.getElementById("getCodeError").innerHTML = res.errors.pop().msg;
            }
            else if(res.success) {
                // document.getElementById("getCodeError").innerHTML = "";
            }
            
        } catch (e) {
            alert(e.toString());
            return;
        }
        
    };
};
export default getCode;