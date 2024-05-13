import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { ReactNode } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FormTitle } from "../Texts";

interface TableAccordionProp {
  actionComponent: ReactNode;
  item: any;
  index: number;
  currentSize?: number;
  title: string | number;
  itemTitle: any[];
}

export const TableAccordionTest = (props: TableAccordionProp) => {
  return (
    <Accordion
      sx={{
        borderRadius: "10px",
      }}
      elevation={0}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<IoIosArrowDown />}
        aria-controls={`panel${props.index}a-content`}
        id={`panel${props.index}a-header`}
      >
        <span>{props.title}</span>
      </AccordionSummary>
      <AccordionDetails>
        {props.itemTitle.map((item, index) => {
          if (
            item.field !== "id" &&
            item.field !== "data" &&
            item.field !== "no"
          ) {
            return (
              <div
                className="flex flex-auto flex-wrap flex-col mb-4"
                key={index}
              >
                <div className="flex-1">
                  <FormTitle children={item.headerName} />
                </div>
                <div className="flex-1">
                  <span className="truncate">
                    {props.item[`${item.field}`]?.toString()}
                  </span>
                </div>
              </div>
            );
          }
        })}
      </AccordionDetails>
      <AccordionActions>{props.actionComponent}</AccordionActions>
    </Accordion>
  );
};
