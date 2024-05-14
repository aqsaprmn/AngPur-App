import { Data } from "@app/pages/Occ/Duty/ImplementationOfWork/ApprovalIOWOCC";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface MapsChild {
  select: boolean;
  selectAsChild: boolean;
  isHoverParent: boolean;
  isHoveredChild: boolean;
  name: string;
}

interface Maps {
  firstLineBottomState: {
    select: boolean;
    selectAsChild: boolean;
    isHoverParent: boolean;
    isHoveredChild: boolean;
    name: string;
  }[];
  firstLineTopState: {
    select: boolean;
    selectAsChild: boolean;
    isHoverParent: boolean;
    isHoveredChild: boolean;
    name: string;
  }[];
  secondLineBottomState: {
    select: boolean;
    selectAsChild: boolean;
    isHoverParent: boolean;
    isHoveredChild: boolean;
    name: string;
  }[];
  secondLineTopState: {
    select: boolean;
    selectAsChild: boolean;
    isHoverParent: boolean;
    isHoveredChild: boolean;
    name: string;
  }[];
  thirdLineBottomState: {
    select: boolean;
    selectAsChild: boolean;
    isHoverParent: boolean;
    isHoveredChild: boolean;
    name: string;
  }[];
  thirdLineTopState: {
    select: boolean;
    selectAsChild: boolean;
    isHoverParent: boolean;
    isHoveredChild: boolean;
    name: string;
  }[];
  handleSelectMap: ({
    payload,
    stateToChange,
  }: {
    payload: {
      select: boolean;
      selectAsChild: boolean;
      isHoverParent: boolean;
      isHoveredChild: boolean;
    }[];
    stateToChange: any[];
  }) => void;
  selectedArea: string[];
  handleReset: () => void;
  setSeletedArea: (data: string[]) => void;
  handleDeleteSelectedArea: (item: string) => void;
  handleSelectMulti: ({
    payload,
  }: {
    payload: {
      select: boolean;
      selectAsChild: boolean;
      isHoverParent: boolean;
      isHoveredChild: boolean;
    }[];
  }) => void;
}

const test = (state: Maps): string[] => {
  console.log("test origin", state);
  let result: any[] = [];
  const mapState: Data = {
    firstLineBottomState: state.firstLineBottomState,
    firstLineTopState: state.firstLineTopState,
    secondLineBottomState: state.secondLineBottomState,
    secondLineTopState: state.secondLineTopState,
    thirdLineBottomState: state.thirdLineBottomState,
    thirdLineTopState: state.thirdLineTopState,
  };

  Object.keys(mapState).map((item) => {
    mapState[item].map((state: any, index: any) => {
      if (state.select == true) {
        result.push(mapState[item][index]);
        result.push(mapState[item][index + 1]);
        result.push(mapState[item][index - 1]);
      }
    });
  });

  const res = [
    ...new Set(
      result
        .filter((e) => e !== undefined)
        .map((test) => {
          return test.name;
        })
    ),
  ];
  console.log({ result });
  return res;
};

const handleSelectArea = (payload: any[]) => {
  return payload.map((item) => item.name);
};

const filterByName = (payload: any[], state: Maps) => {
  const mapState: Data = {
    firstLineBottomState: state.firstLineBottomState,
    firstLineTopState: state.firstLineTopState,
    secondLineBottomState: state.secondLineBottomState,
    secondLineTopState: state.secondLineTopState,
    thirdLineBottomState: state.thirdLineBottomState,
    thirdLineTopState: state.thirdLineTopState,
  };

  payload.forEach((item) => {
    const matchingItem = findMatchingItemByName(mapState, item.name);
    if (matchingItem) {
      matchingItem.select = item.select;
      matchingItem.selectAsChild = item.selectAsChild;
    }
  });
  console.log(mapState);
  return payload.map((item) => item.name);
};

const findMatchingItemByName = (
  mapState: Data,
  name: string
): MapsChild | undefined => {
  const allStateItems: MapsChild[] = Object.values(mapState).flat();
  return allStateItems.find((stateItem) => stateItem.name === name);
};

const removeSelected = (state: Maps, item: string): string[] => {
  const process = state.selectedArea.filter((e) => e !== item);
  const result = [...new Set(process)];

  return result;
};
const handleSetSelected = (state: Maps, item: string[]) => {
  const test: Data = {
    firstLineBottomState: state.firstLineBottomState,
    firstLineTopState: state.firstLineTopState,
    secondLineBottomState: state.secondLineBottomState,
    secondLineTopState: state.secondLineTopState,
    thirdLineBottomState: state.thirdLineBottomState,
    thirdLineTopState: state.thirdLineTopState,
  };

  Object.keys(test).map((e) => {
    (test[e] as MapsChild[]).map((items) => {
      if (item.includes(items.name)) {
        items.select = true;
      }
    });
  });

  return test as {
    firstLineBottomState: MapsChild[];
    firstLineTopState: MapsChild[];
    secondLineBottomState: MapsChild[];
    secondLineTopState: MapsChild[];
    thirdLineBottomState: MapsChild[];
    thirdLineTopState: MapsChild[];
  };
};

// let initialState = {
//   firstLineBottomState: [
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 1 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 2 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 3 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 4 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 5 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 6 - Track 1",
//     },
//   ],
//   firstLineTopState: [
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 1 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 2 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 3 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 4 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 5 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 6 - Track 2",
//     },
//   ],
//   secondLineBottomState: [
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 14 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 15 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 16 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 17 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 18 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 19 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 20 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 21 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 22 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section D - Track 1",
//     },
//   ],
//   secondLineTopState: [
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 14 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 15 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 16 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 17 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 18 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 19 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 20 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 21 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 22 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section D1 - Track 2",
//     },
//   ],
//   thirdLineBottomState: [
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 7 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 8 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 9 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 10 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 11 - Track 1",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 12 - Track 1",
//     },
//   ],
//   thirdLineTopState: [
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 7 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 8 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 9 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 10 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 11 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 12 - Track 2",
//     },
//     {
//       isHoveredChild: false,
//       isHoverParent: false,
//       select: false,
//       selectAsChild: false,
//       name: "Section 13 - Track 2",
//     },
//   ],
//   selectedArea: [],
// };

export const useMapStore = create<Maps>()(
  devtools(
    persist(
      (set) => ({
        firstLineBottomState: [
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 1 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 2 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 3 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 4 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 5 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 6 - Track 1",
          },
        ],
        firstLineTopState: [
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 1 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 2 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 3 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 4 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 5 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 6 - Track 2",
          },
        ],
        secondLineBottomState: [
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 14 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 15 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 16 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 17 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 18 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 19 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 20 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 21 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 22 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section D - Track 1",
          },
        ],
        secondLineTopState: [
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 14 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 15 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 16 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 17 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 18 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 19 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 20 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 21 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 22 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section D1 - Track 2",
          },
        ],
        thirdLineBottomState: [
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 7 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 8 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 9 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 10 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 11 - Track 1",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 12 - Track 1",
          },
        ],
        thirdLineTopState: [
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 7 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 8 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 9 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 10 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 11 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 12 - Track 2",
          },
          {
            isHoveredChild: false,
            isHoverParent: false,
            select: false,
            selectAsChild: false,
            name: "Section 13 - Track 2",
          },
        ],
        selectedArea: [],
        handleSelectMap: ({
          payload,
          stateToChange,
        }: {
          payload: {
            select: boolean;
            selectAsChild: boolean;
            isHoverParent: boolean;
            isHoveredChild: boolean;
          }[];
          stateToChange: any[];
        }) => {
          console.log(stateToChange);
          set((state) => ({
            ...state,
            stateToChange: payload,
            selectedArea: test(state),
          }));
        },
        handleSelectMulti: ({
          payload,
        }: {
          payload: {
            select: boolean;
            selectAsChild: boolean;
            isHoverParent: boolean;
            isHoveredChild: boolean;
          }[];
        }) => {
          set((state) => ({
            ...state,
            stateToChange: filterByName(payload, state),
            selectedArea: handleSelectArea(payload),
          }));
        },
        handleReset: () => {
          set((state) => ({
            ...state,
            firstLineBottomState: [
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 1 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 2 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 3 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 4 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 5 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 6 - Track 1",
              },
            ],
            firstLineTopState: [
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 1 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 2 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 3 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 4 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 5 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 6 - Track 2",
              },
            ],
            secondLineBottomState: [
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 14 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 15 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 16 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 17 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 18 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 19 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 20 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 21 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 22 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section D - Track 1",
              },
            ],
            secondLineTopState: [
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 14 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 15 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 16 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 17 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 18 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 19 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 20 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 21 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 22 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section D1 - Track 2",
              },
            ],
            thirdLineBottomState: [
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 7 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 8 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 9 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 10 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 11 - Track 1",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 12 - Track 1",
              },
            ],
            thirdLineTopState: [
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 7 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 8 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 9 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 10 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 11 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 12 - Track 2",
              },
              {
                isHoveredChild: false,
                isHoverParent: false,
                select: false,
                selectAsChild: false,
                name: "Section 13 - Track 2",
              },
            ],
            selectedArea: [],
          }));
        },
        handleDeleteSelectedArea: (item: string) => {
          set((state) => ({
            ...state,
            selectedArea: removeSelected(state, item),
          }));
        },
        setSeletedArea: (data: string[]) => {
          set((state) => ({
            ...state,
            selectedArea: data,
            firstLineBottomState: handleSetSelected(state, data)
              .firstLineBottomState,
            firstLineTopState: handleSetSelected(state, data).firstLineTopState,
            secondLineBottomState: handleSetSelected(state, data)
              .secondLineBottomState,
            secondLineTopState: handleSetSelected(state, data)
              .secondLineTopState,
            thirdLineBottomState: handleSetSelected(state, data)
              .thirdLineBottomState,
            thirdLineTopState: handleSetSelected(state, data).thirdLineTopState,
          }));
        },
      }),
      {
        name: "maps",
      }
    ),
    {
      name: "maps",
      features: {
        dispatch: true,
        jump: true,
        pause: true,
        persist: true,
        skip: true,
      },
      enabled: true,
    }
  )
);
