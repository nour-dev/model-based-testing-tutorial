import { createModel } from "@xstate/test";
import { Machine } from "xstate";
import Elevator, { getElevatorMachineDefinition } from "./Elevator";
import { render, RenderResult, fireEvent, wait } from "@testing-library/react";
import React from "react";

const getEventConfigs = () => {
  const eventConfigs = {
    GO_UP: {
      exec: async ({ getByText }: RenderResult) => {
        // Action
      },
    },
    GO_DOWN: {
      exec: async ({ getByText }: RenderResult) => {
        // Action
      },
    },
  };

  return eventConfigs;
};

const bottomTest = {
  test: async ({ getByText }: RenderResult) => {
    // Assert
  },
};
const topTest = {
  test: async ({ getByText }: RenderResult) => {
    // Assert
  },
};

describe("Elevator", () => {
  describe("matches all paths", () => {
    const testMachineDefinition = getElevatorMachineDefinition();

    (testMachineDefinition.states.bottom as any).meta = bottomTest;
    (testMachineDefinition.states.top as any).meta = topTest;

    const testMachine = Machine(testMachineDefinition);

    const testModel = createModel(testMachine).withEvents(
      getEventConfigs() as any
    );

    const testPlans = testModel.getSimplePathPlans();

    testPlans.forEach((plan) => {
      describe(plan.description, () => {
        plan.paths.forEach((path) => {
          it(path.description, async () => {
            await path.test(render(<Elevator />));
          });
        });
      });
    });

    it("should have full coverage", () => {
      return testModel.testCoverage();
    });
  });
});
