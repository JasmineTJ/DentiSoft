import React, { useState } from "react";
import { Button, Stack, useTheme } from "@mui/material";

function TimeButtons({ workingHours, displayDirection }) {
  const theme = useTheme();
  const colorStyle = theme.palette.mode === "dark" ? "white" : "black";
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
  const buttons = [];

  if (!workingHours) {
    return null; // Return early if workingHours is null
  }

  // Split the string into two parts using ' - ' as the delimiter
  const [startHour, startMeridiem, endHour, endMeridiem] = workingHours
    .match(/(\d+)\s*([ap]m)\s*-\s*(\d+)\s*([ap]m)/i)
    .slice(1);

  // Convert start and end hours to 24-hour format
  const startHour24 =
    startMeridiem.toLowerCase() === "pm"
      ? parseInt(startHour, 10) + 12
      : parseInt(startHour, 10);
  const endHour24 =
    endMeridiem.toLowerCase() === "pm"
      ? parseInt(endHour, 10) + 12
      : parseInt(endHour, 10);

  const handleClick = (index) => {
    setClickedButtonIndex(index);
    const selectedTime = `${index.toString().padStart(2, "0")}:00-${index.toString().padStart(2, "0")}:30`
    sessionStorage.setItem("selectedWorkingHoursIndex", selectedTime)
  };

  for (let i = startHour24; i < endHour24; i++) {
    const startTimeString = `${i.toString().padStart(2, "0")}:00`;
    const endTimeString = `${i.toString().padStart(2, "0")}:30`;

    buttons.push(
      <Stack
        display={"flex"}
        direction={"row"}
        gap={0}
        width={"300px"}
        flexWrap={"wrap"}
      >
        <React.Fragment key={i}>
          <Button
            sx={{
              minWidth: "90px",
              flex: 1,
              color: colorStyle,
              bgcolor: clickedButtonIndex === i ? "red" : "transparent",
            }}
            variant="outlined"
            onClick={() => handleClick(i)}
          >{`${startTimeString}-${endTimeString}`}</Button>
        </React.Fragment>
      </Stack>
    );
  }

  return (
    <Stack display={"flex"} direction={`${displayDirection}`}>
      {buttons}
    </Stack>
  );
}

export default TimeButtons;
