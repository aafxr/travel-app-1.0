import './css/reset.css';
import './css/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import {AppContextProvider} from "./contexts/AppContextProvider/AppContextProvider";
import defaultHandleError from "./utils/error-handlers/defaultHandleError";
import {SubjectContextProvider} from "./contexts/SubjectContextProvider";
import {ThemeContextProvider} from "./contexts/ThemeContextProvider";
import {pushAlertMessage} from "./components/Alerts";
import {CACHE_VERSION, THEME} from "./constants";
import setFixedVH from "./utils/setFixedVH";
import App from './App';



let theme = localStorage.getItem(THEME)
theme = theme === 'default' ? 'light-theme' : theme
document.body.classList.add(theme)

// generateCurrency()

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <AppContextProvider>
        <ThemeContextProvider>
            <SubjectContextProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </SubjectContextProvider>
        </ThemeContextProvider>
    </AppContextProvider>
);


//===================== установка фикчированного vh ================================================
setFixedVH()
window.addEventListener('resize', setFixedVH)

//====================== чистка кэш  ===============================================================
const version = JSON.parse(localStorage.getItem('cache-version'))
localStorage.setItem('cache-version', CACHE_VERSION.toString())
if (+version !== CACHE_VERSION) {
    caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        )
            .then(() => window.location.reload())
    }).catch(defaultHandleError)
}

serviceWorkerRegistration.register()


if (ServiceWorker in window) {
    navigator.serviceWorker.ready.then(registration => console.log(registration))
}


document.addEventListener('devicemotion', /** @param {DeviceMotionEvent} e */(e) => {
    const {x, y, z} = e.acceleration
    pushAlertMessage({type: "info", message: `Device move: (${x}, ${y}, ${z})`})
})


