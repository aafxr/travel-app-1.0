import './css/reset.css';
import './css/index.css';
import React from 'react';
import {Provider} from "react-redux";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import {LoadActionsComponent} from "./components/LoadActionsComponent/LoadActionsComponent";
import {AppContextProvider} from "./contexts/AppContextProvider/AppContextProvider";
import defaultHandleError from "./utils/error-handlers/defaultHandleError";
import {SubjectContextProvider} from "./contexts/SubjectContextProvider";
import {ThemeContextProvider} from "./contexts/ThemeContextProvider";
import {CACHE_VERSION, THEME} from "./constants";
import Alerts from "./components/Alerts/Alerts";
import setFixedVH from "./utils/setFixedVH";
import {store} from "./redux";
import App from './App';


let theme = localStorage.getItem(THEME)
theme = theme === 'default' ? 'light-theme' : theme
document.body.classList.add(theme)

// generateCurrency()

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <Provider store={store}>
        <AppContextProvider>
            <ThemeContextProvider>
                <SubjectContextProvider>
                    <BrowserRouter>
                        <App/>
                        <LoadActionsComponent/>
                        <Alerts />
                    </BrowserRouter>
                </SubjectContextProvider>
            </ThemeContextProvider>
        </AppContextProvider>
    </Provider>
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
