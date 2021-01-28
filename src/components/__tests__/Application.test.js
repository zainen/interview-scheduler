import React from "react";

import { render, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application"; 

import axios from 'axios'

// afterEach(cleanup);


describe('Application', ()  => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    
    await waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  it('loads data, books an interview and reduces the sots remaining for the day by 1', async () => {
    const { container } = render(<Application />)
    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointments = getAllByTestId(container, 'appointment')
    const appointment = appointments[0]
    fireEvent.click(getByAltText(appointment, 'Add'))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    })
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))
    fireEvent.click(getByText(appointment, 'Save'))
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  })

  it('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />)
    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointments = getAllByTestId(container, 'appointment')
    const appointment = appointments[1]
    fireEvent.click(getByAltText(appointment, 'Delete'))
    expect(getByText(appointment, 'Confirm'))
    fireEvent.click(getByText(appointment, 'Confirm'))
    expect(getByText(appointment, 'DELETING'))
  })

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));
  
  });
  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { container } = render(<Application />)
    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    )
    fireEvent.click(getByAltText(appointment, 'Edit'))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Jeff"}
    })
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))
    fireEvent.click(getByText(appointment, 'Save'))
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Jeff"));
  })
  
  it('shows the save error when failing to save an appointment', async () => {
    axios.put.mockRejectedValueOnce()
    const { container } = render(<Application />)
    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointments = getAllByTestId(container, 'appointment')
    const appointment = appointments[0]
    fireEvent.click(getByAltText(appointment, 'Add'))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    })
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))
    fireEvent.click(getByText(appointment, 'Save'))
    expect(getByText(appointment, "SAVING")).toBeInTheDocument()
    await waitForElement(() => getByText(appointment, 'ERROR_SAVE'))

    expect(getByText(appointment, "ERROR_SAVE")).toBeInTheDocument()
    const day = getAllByTestId(container, 'day').find(day => {
      return getByText(day, 'Monday')
    })
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })
  it('shows the delete error when failing to delete an existing appointment', async () => {
    axios.delete.mockRejectedValueOnce()
    const { container } = render(<Application />)
    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointments = getAllByTestId(container, 'appointment')
    const appointment = appointments[1]
    fireEvent.click(getByAltText(appointment, 'Delete'))
    expect(getByText(appointment, 'Confirm'))
    fireEvent.click(getByText(appointment, 'Confirm'))
    expect(getByText(appointment, 'DELETING'))
    await waitForElement(() => getByText(appointment, 'ERROR_DELETE'))
    expect(getByText(appointment, 'ERROR_DELETE')).toBeInTheDocument()
    const day = getAllByTestId(container, 'day').find(day => {
      return getByText(day, 'Monday')
    })
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })
})

