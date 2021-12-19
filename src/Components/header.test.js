import {render, screen} from '@testing-library/react';
import Header from './Header';

test("Verifying header",async ()=>{
    render(<Header/>);
    const headerElement = await screen.findByRole("heading");
    expect(headerElement).toHaveTextContent("Admin Panel");
})