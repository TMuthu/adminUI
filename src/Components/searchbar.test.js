import {fireEvent, render, screen} from "@testing-library/react";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Searchbar from './Searchbar';

describe("Searchbar Test",()=>{
    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    test("searchbar visibility testing",()=>{
        render(<Provider store={store}><Searchbar/></Provider>);
        const searchbar = screen.getByPlaceholderText("Search people by Name,email or role...");
        expect(searchbar).toBeInTheDocument();
    })

    test("searchbar input functionality testing", ()=>{
        render(<Provider store={store}><Searchbar/></Provider>);
        const searchbar = screen.getByPlaceholderText("Search people by Name,email or role...");
        fireEvent.change(searchbar,{target : {value : "Admin"}});
        expect(searchbar.value).toBe("Admin");
    })

})
