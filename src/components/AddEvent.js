import React from 'react';
import {useState} from 'react';

function AddEvent()
{

    const [isOpen, setIsOpen] = useState(false)

    const app_name = "eventure-calendar-test";
    function buildPath(route) {
        if (process.env.NODE_ENV === "production") {
            return "https://" + app_name + ".herokuapp.com/" + route;
        } else {
            return "https://" + app_name + ".herokuapp.com/" + route;
        }
    }
    const [startDate, onChange] = useState(new Date());
    const [endDate, onChange2] = useState(new Date());

    var title;
    var location;
    var description;

    const addEvent = async (event) => {
        event.preventDefault();
        title = document.getElementById("eventtitle").value
        location = document.getElementById("location").value
        description = document.getElementById("description").value

        var obj = {title: title, description: description, location: location, startTime: startDate, endTime: endDate};

        console.log(obj);
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(buildPath('api/events/create'), {
                method: "POST",
                body: js,
                headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + localStorage.getItem('token')},
            });

            var res = JSON.parse(await response.text());



                console.log(res);



        } catch (e) {
            alert(e.toString());
            return;
        }
    };
}