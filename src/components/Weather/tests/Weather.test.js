/* describe("Weater", () => {
    it("should render correctly", () => {
        const tree = renderer.create(<Weather />).toJSON();
        expect(tree).toMatchSnapshot();
    });
}) */
import { render, screen, waitFor } from '@testing-library/react';
import Weather from '../Weather';


test('renders weather component', () => {
    render(<Weather />);
    const text = screen.getByTestId(/weather/i);
    expect(text).toBeInTheDocument();
});


it("should change the button's text color", async () => {
    const text = screen.getByText(/denied/i);
    expect(text).toBeInTheDocument();
    // await waitFor(() => {
    // });
});

/* test('user authorized geolocation', async () => {
    // navigator.geolocation.getCurrentPosition((position)=>{
    //     expect(position)
    // });
    navigator.geolocation.getCurrentPosition((position)=>{
        // expect(position).toEqual({coords: {latitude: expect.any(Number), longitude:expect.any(Number)}});
        expect(position).toEqual(expect.not.objectContaining({
            coords: {
                latitude: expect.any(Number),
                longitude:expect.any(Number)
            }}
        ));
    });
}); */