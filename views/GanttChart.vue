<template>
  <h2>甘特圖</h2>
  <!-- <div class="vue-root">
    <smart-gantt-chart
      id="ganttChart"
      view="week"
      duration-unit="day"
    ></smart-gantt-chart>
    <div class="options">
      <div class="option" id="eventLog">
        <div id="log"></div>
      </div>
    </div>
  </div> -->
  <div class="vue-root">
    <smart-gantt-chart id="gant"></smart-gantt-chart>
    <template id="myTemplate">
      <div class="custom-window-content">
        <div class="custom-window-content-section">
          <label id="taskLabel"></label>
        </div>
        <div class="custom-window-content-section"><b>Description</b></div>
        <div class="custom-window-content-section">
          <smart-multiline-text-box id="description"></smart-multiline-text-box>
        </div>
        <div class="custom-window-content-section"><b>Time Period</b></div>
        <div class="custom-window-content-section date-controls">
          <div class="custom-window-content-section">
            <select id="dayPicker">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
            <select id="monthPicker">
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
            <select id="yearPicker">
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div class="custom-window-content-section">
            <smart-repeat-button id="dayDecrementBtn"
              ><span class="smart-minus-icon"></span>
            </smart-repeat-button>
            <smart-text-box id="dayInput"></smart-text-box>
            <smart-repeat-button id="dayIncrementBtn"
              ><span class="smart-plus-icon"></span>
            </smart-repeat-button>
            <label>Days</label>
          </div>
          <div class="custom-window-content-section">
            <label id="totalDate"></label>
          </div>
        </div>
        <div class="custom-window-content-section buttons">
          <smart-button class="error flat" id="deleteBtn">Delete</smart-button>
          <smart-button class="primary flat" id="cancelBtn"
            >Cancel</smart-button
          >
          <smart-button class="primary" id="saveBtn">Save</smart-button>
        </div>
      </div>
      <div class="d-flex">
        <button class="btn-outline" @click="handleSubmit">
          <strong>回主頁</strong>
        </button>
        <button class="btn-outline" @click="addTask">
          <strong>新增任務</strong>
        </button>
        <button class="btn-outline" @click="cancel">
          <strong>取消</strong>
        </button>
      </div>
    </template>
  </div>
</template>

 <script>
// *******************************************************************
//                          Popup Editor
// *******************************************************************

import { onMounted } from "vue";
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.button.js";
import "smart-webcomponents/source/modules/smart.ganttchart.js";
import "smart-webcomponents/source/modules/smart.multilinetextbox.js";
import "smart-webcomponents/source/modules/smart.textbox.js";

export default {
  name: "GanttCHart",
  setup() {
    onMounted(() => {
      const gantt = document.querySelector("smart-gantt-chart");
      gantt.durationUnit = "day";
      gantt.view = "week";
      gantt.treeSize = "30%";
      gantt.dateStart = "2021-04-01";
      gantt.timelineHeaderFormatFunction = function (
        date,
        type,
        isHeaderDetailsContainer
      ) {
        if (isHeaderDetailsContainer) {
          let startDate = new Date(date),
            endDate = new Date(date),
            formatDate = (date) =>
              date
                .toLocaleDateString(gantt.locale, {
                  day: "2-digit",
                  month: "short",
                })
                .toUpperCase();
          //the view is set to 'week' so add 6 days to the first to get the last
          endDate.setDate(endDate.getDate() + 6);
          //Validate the endDate according to timeline end
          endDate = new Date(
            Math.min(gantt.dateEnd.getTime(), endDate.getTime())
          );
          return formatDate(startDate) + " - " + formatDate(endDate);
        } else {
          return new Date(date)
            .toLocaleDateString(gantt.locale, {
              weekday: "short",
            })
            .toUpperCase();
        }
      };
      gantt.taskColumns = [
        {
          label: "TASK NAME",
          value: "label",
          size: "50%",
        },
        {
          label: "START TIME",
          value: "dateStart",
          size: "30%",
          formatFunction: function (dateString) {
            const date = new Date(dateString),
              formatNumber = (number) => ("0" + number).slice(-2);
            return (
              date.getFullYear() +
              "-" +
              formatNumber(date.getMonth() + 1) +
              "-" +
              formatNumber(date.getDate())
            );
          },
        },
        {
          label: "DURATION",
          value: "duration",
          formatFunction: (duration) => parseInt(duration),
        },
      ];
      gantt.dataSource = [
        {
          type: "project",
          label: "Office Preparation",
          synchronized: true,
          expanded: true,
          progress: 35,
          tasks: [
            {
              label: "Office Inspection",
              synchronized: true,
              expanded: true,
              progress: 55,
              type: "project",
              connections: [
                {
                  target: "furnitureInArrangement",
                  type: 1,
                },
              ],
              tasks: [
                {
                  label: "Interior Arrangement",
                  dateStart: "2021-04-02",
                  duration: 3,
                  type: "task",
                },
                {
                  label: "Climate Control Installation",
                  dateStart: "2021-04-05",
                  duration: 2,
                  type: "task",
                },
              ],
            },
            {
              id: "furnitureInArrangement",
              label: "Furniture Arrangement",
              synchronized: true,
              progress: 55,
              type: "project",
              connections: [
                {
                  target: "employeePositioning",
                  type: 1,
                },
              ],
              tasks: [
                {
                  label: "Workstations Positioning",
                  dateStart: "2021-04-08",
                  duration: 2,
                  type: "task",
                },
              ],
            },
            {
              id: "employeePositioning",
              label: "Employee Positioning",
              synchronized: true,
              expanded: true,
              progress: 50,
              type: "project",
              tasks: [
                {
                  label: "Workplaces Allocation",
                  dateStart: "2021-04-10",
                  duration: 3,
                  progress: 50,
                  connections: [
                    {
                      target: "workstationsAssembly",
                      type: 1,
                    },
                  ],
                  type: "task",
                },
                {
                  id: "workstationsAssembly",
                  label: "Workstations Assembly",
                  dateStart: "2021-04-13",
                  duration: 3,
                  progress: 50,
                  connections: [
                    {
                      target: "workstationsInspection",
                      type: 1,
                    },
                  ],
                  type: "task",
                },
                {
                  id: "workstationsInspection",
                  label: "Workstations Inspection",
                  dateStart: "2021-04-16",
                  duration: 3,
                  progress: 50,
                  type: "task",
                },
              ],
            },
          ],
        },
        {
          type: "project",
          label: "Product Release",
          synchronized: true,
          expanded: true,
          progress: 65,
          tasks: [
            {
              label: "Planning",
              dateStart: "2021-04-02",
              duration: 5,
              progress: 100,
              type: "task",
            },
            {
              label: "Development",
              synchronized: true,
              expanded: true,
              progress: 50,
              type: "project",
              connections: [
                {
                  target: "releasev1",
                  type: 1,
                },
              ],
              tasks: [
                {
                  label: "Developing/Coding",
                  dateStart: "2021-04-03",
                  duration: 5,
                  type: "task",
                  progress: 100,
                  connections: [
                    {
                      target: "betaRelease",
                      type: 1,
                    },
                  ],
                },
                {
                  id: "betaRelease",
                  label: "Beta Release",
                  dateStart: "2021-04-08",
                  type: "milestone",
                  connections: [
                    {
                      target: "integrateSystem",
                      type: 1,
                    },
                  ],
                },
                {
                  id: "integrateSystem",
                  label: "Integration",
                  dateStart: "2021-04-08",
                  duration: 4,
                  type: "task",
                  progress: 100,
                  connections: [
                    {
                      target: "test",
                      type: 1,
                    },
                  ],
                },
                {
                  id: "test",
                  label: "Testing",
                  dateStart: "2021-04-12",
                  duration: 3,
                  type: "task",
                  progress: 15,
                  connections: [
                    {
                      target: "marketing",
                      type: 1,
                    },
                  ],
                },
                {
                  id: "marketing",
                  label: "Marketing and Sales",
                  dateStart: "2021-04-15",
                  duration: 4,
                  type: "task",
                },
              ],
            },
            {
              label: "Feedback Analysis and QA",
              dateStart: "2021-04-02",
              duration: 4,
              type: "task",
              progress: 75,
              connections: [
                {
                  target: "design",
                  type: 1,
                },
              ],
            },
            {
              id: "design",
              label: "Design",
              synchronized: true,
              expanded: true,
              progress: 25,
              type: "project",
              tasks: [
                {
                  label: "Database",
                  dateStart: "2021-04-06",
                  duration: 4,
                  progress: 50,
                  type: "task",
                },
                {
                  label: "User Interface",
                  dateStart: "2021-04-08",
                  duration: 4,
                  progress: 10,
                  type: "task",
                },
              ],
            },
            {
              label: "Documentation",
              dateStart: "2021-04-11",
              duration: 5,
              type: "task",
              connections: [
                {
                  target: "releasev1",
                  type: 1,
                },
              ],
            },
            {
              id: "releasev1",
              label: "Release v1",
              dateStart: "2021-04-19",
              type: "milestone",
            },
          ],
        },
      ];
      let task,
        taskLabel,
        description,
        dayPicker,
        monthPicker,
        yearPicker,
        dayIncrementBtn,
        dayDecrementBtn,
        dayInput,
        totalDate,
        deleteBtn,
        cancelBtn,
        saveBtn;
      gantt.popupWindowCustomizationFunction = function (
        target,
        type,
        targetTask
      ) {
        if (type === "task" && targetTask) {
          let addListeners;
          //Hide the header
          target.headerPosition = "none";
          target.footerPosition = "none";
          //Create the content
          if (!document.getElementById("taskLabel")) {
            addListeners = true;
            target.clear();
            const template = document.getElementById("myTemplate");
            target.appendChild(template.content);
          }
          taskLabel = document.getElementById("taskLabel");
          description = document.getElementById("description");
          dayPicker = document.getElementById("dayPicker");
          monthPicker = document.getElementById("monthPicker");
          yearPicker = document.getElementById("yearPicker");
          dayIncrementBtn = document.getElementById("dayIncrementBtn");
          dayDecrementBtn = document.getElementById("dayDecrementBtn");
          dayInput = document.getElementById("dayInput");
          totalDate = document.getElementById("totalDate");
          deleteBtn = document.getElementById("deleteBtn");
          cancelBtn = document.getElementById("cancelBtn");
          saveBtn = document.getElementById("saveBtn");
          //Configure the content
          const dateStart = targetTask.dateStart,
            dateEnd = targetTask.dateEnd;

          if (!dateStart || !dateEnd) {
            taskLabel.innerHTML = "";
          } else {
            taskLabel.innerHTML =
              dateStart.toLocaleDateString(gantt.locale) +
              " - " +
              dateEnd.toLocaleDateString(gantt.locale);
          }
          description.value = targetTask.label;
          dayPicker.value = dateStart.getDate().toString();
          monthPicker.value = dateStart.getMonth().toString();
          yearPicker.value = dateStart.getFullYear().toString();
          dayInput.value = targetTask.duration.toString();
          totalDate.innerHTML = targetTask.dateEnd.toDateString();
          task = targetTask;
          if (addListeners) {
            dayIncrementBtn.addEventListener("click", function () {
              dayInput.value = Math.min(
                31,
                (parseInt(dayInput.value) || 0) + 1
              ).toString();
              updateTotalDate();
            });
            dayDecrementBtn.addEventListener("click", function () {
              dayInput.value = Math.max(
                1,
                (parseInt(dayInput.value) || 0) - 1
              ).toString();
              updateTotalDate();
            });
            deleteBtn.addEventListener("click", deleteTask);
            cancelBtn.addEventListener("click", cancelTask);
            saveBtn.addEventListener("click", saveTask);
          }
          const dateControls = target.querySelector(
            ".custom-window-content-section.date-controls"
          );
          if (dateControls) {
            if (targetTask.type === "project" && targetTask.synchronized) {
              dateControls.setAttribute("disabled", true);
            } else {
              dateControls.removeAttribute("disabled");
            }
          }
        }
      };

      function updateTotalDate() {
        let newDateEnd = new Date(
          parseInt(yearPicker.value),
          parseInt(monthPicker.value),
          parseInt(dayPicker.value)
        );
        newDateEnd.setDate(newDateEnd.getDate() + parseInt(dayInput.value));
        if (isNaN(newDateEnd.getTime())) {
          totalDate.innerHTML = "";
          return;
        }
        totalDate.innerHTML = newDateEnd.toDateString();
      }

      function deleteTask() {
        gantt.removeTask(task);
        gantt.closeWindow();
        task = undefined;
      }

      function cancelTask() {
        gantt.closeWindow();
      }

      function saveTask() {
        let dateStart = new Date(
            parseInt(yearPicker.value),
            parseInt(monthPicker.value),
            parseInt(dayPicker.value)
          ),
          duration = parseInt(dayInput.value);
        gantt.updateTask(task, {
          label: description.value,
          dateStart: dateStart,
          duration: duration,
        });
        gantt.closeWindow();
        task = undefined;
      }
    });
  },
};

// *******************************************************************
//                        Normal Editor
// *******************************************************************

// import { onMounted } from "vue";
// import "smart-webcomponents/source/styles/smart.default.css";
// import "smart-webcomponents/source/modules/smart.ganttchart.js";

// export default {
//   name: "app",
//   setup() {
//     onMounted(() => {
//       const gantt = document.querySelector("smart-gantt-chart");
//       gantt.treeSize = "25%";
//       gantt.taskColumns = [
//         {
//           label: "任務",
//           value: "label",
//           size: "20%",
//         },
//         {
//           label: "開始日",
//           value: "dateStart",
//           size: "25%",
//         },
//         {
//           label: "持續天數",
//           value: "duration",
//           formatFunction: (date) => parseInt(date),
//           customEditor: function () {
//             let fragment = document.createDocumentFragment(),
//               customEditorLabel = document.createElement("label"),
//               dropDownList = document.createElement("smart-drop-down-list");
//             customEditorLabel.innerHTML = "持續天數";
//             dropDownList.dropDownAppendTo = "內容";
//             dropDownList.dataSource = [7, 14, 21, 30];
//             fragment.appendChild(customEditorLabel);
//             fragment.appendChild(dropDownList);
//             return fragment;
//           },
//           setCustomEditorValue: function (editor, label, value) {
//             const dropDownList = editor.querySelector("smart-drop-down-list");
//             dropDownList.select(value.toString());
//           },
//           getCustomEditorValue: function (editor) {
//             const dropDownList = editor.querySelector("smart-drop-down-list");
//             return dropDownList.selectedValues[0];
//           },
//         },
//       ];
//       gantt.dataSource = [
//         {
//           label: "John",
//           dateStart: "2021-06-17T06:30:00",
//           dateEnd: "2021-07-30T06:30:00",
//           connections: [
//             {
//               target: 1,
//               type: 1,
//             },
//           ],
//           duration: 8,
//           class: "john",
//           type: "task",
//         },
//         {
//           label: "Jane",
//           dateStart: "2021-06-18T09:00:00",
//           dateEnd: "2021-07-31T06:30:00",
//           connections: [
//             {
//               target: 2,
//               type: 1,
//             },
//           ],
//           duration: 8,
//           class: "jane",
//           type: "task",
//         },
//         {
//           label: "Peter",
//           dateStart: "2021-06-19T07:30:00",
//           dateEnd: "2021-08-10T06:30:00",
//           connections: [
//             {
//               target: 3,
//               type: 1,
//             },
//           ],
//           duration: 8,
//           class: "peter",
//           type: "task",
//         },
//         {
//           label: "Melania",
//           dateStart: "2021-06-20T10:00:00",
//           dateEnd: "2021-08-15T06:30:00",
//           connections: [
//             {
//               target: 4,
//               type: 1,
//             },
//           ],
//            duration: 8,
//            class: "melania",
//            type: "task",
//          },
//          {
//            label: "Donald",
//            dateStart: "2021-06-21T08:30:00",
//            dateEnd: "2021-08-16T06:30:00",
//            connections: [
//              {
//                target: 5,
//                type: 1,
//              },
//            ],
//            duration: 8,
//            class: "donald",
//            type: "task",
//          },
//       ];
//      });
//   },
//  };
</script>


<style>
.sub-btn {
  display: flex;
  margin-left: 120px;
  margin-right: 170px;
}
#ganttChart {
  width: 1200px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
}

label.gantt_title {
  font-size: 32px;
  text-align: center;
  color: #a3a3a3;
}

.d-flex,
.btn-outline {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px auto;
  border-radius: 8px;
  padding: 8px 3px;
  width: 30%;
  font-size: 18px;
}

.btn-outline {
  border: 2px solid #00ce89;
  color: #00ce89;
}

.btn-outline:hover {
  background: #00ce89;
  color: white;
  cursor: pointer;
  font-size: 20px;
}

.smart-gantt-chart {
  width: calc(100% - 300px);
  height: 450px;
}
@media only screen and (max-width: 600px) {
  .smart-gantt-chart {
    width: 100%;
    height: auto;
  }
}
/* popup editor */

smart-gantt-chart {
  height: auto;
  --smart-gantt-chart-task-tree-splitter-bar-fit-size: calc(
    2 * var(--smart-gantt-chart-task-default-height)
  );
  --smart-gantt-chart-project-color: #1de9b6;
  --smart-gantt-chart-task-color: #448aff;
  --smart-gantt-chart-milestone-color: #ffc107;
  --smart-gantt-chart-task-label-color: white;
  --smart-gantt-chart-task-label-color-selected: white;
  --smart-gantt-chart-project-label-color: rgba(0, 0, 0, 0.6);
  --smart-gantt-chart-project-label-color-selected: rgba(0, 0, 0, 0.6);
  --smart-gantt-chart-timeline-task-connection-color: #87a4bc;
  --smart-gantt-chart-timeline-task-connection-color-hover: #87a4bc;
  --smart-gantt-chart-timeline-task-connection-feedback-color: #87a4bc;
  --smart-gantt-chart-timeline-weekend-color: initial;
  --smart-gantt-chart-task-default-height: 35px;
  --smart-gantt-chart-task-fill-border-radius: 10px;
  --smart-gantt-chart-task-popup-window-default-width: 550px;
}

#description {
  --smart-multiline-text-box-default-height: 75px;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

#dayPicker,
#monthPicker,
#yearPicker {
  height: 30px;
  border-color: #e0e0e0;
  border-radius: 4px;
}

#dayPicker {
  width: 40px;
}

#yearPicker {
  width: 60px;
}

#dayInput,
#dayIncrementBtn,
#dayDecrementBtn {
  width: 30px;
  --smart-button-padding: 5px;
  --smart-text-box-text-align: center;
}

.custom-window-content {
  display: grid;
  grid-row-gap: 15px;
  padding: 15px;
}

.custom-window-content-section[disabled] {
  pointer-events: none;
  opacity: 0.25;
}

.custom-window-content-section:first-of-type label {
  font-size: 20px;
  font-weight: 600;
}

.custom-window-content-section.date-controls {
  display: grid;
  grid-row-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5px;
  align-items: center;
}

.custom-window-content-section.date-controls .custom-window-content-section {
  display: grid;
  align-items: center;
  grid-column-gap: 5px;
  grid-template-columns: repeat(4, auto);
  justify-content: center;
}

.custom-window-content-section.date-controls
  .custom-window-content-section:first-of-type {
  grid-template-columns: repeat(3, 1fr);
}

.custom-window-content-section.date-controls
  .custom-window-content-section:last-of-type {
  grid-template-columns: repeat(1, 1fr);
}

.custom-window-content-section.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-content: center;
  column-gap: 5px;
}

#cancelBtn {
  grid-column-start: 3;
}

#totalDate {
  white-space: nowrap;
  min-width: 100px;
}

body {
  height: 1000px;
}

.smart-minus-icon,
.smart-plus-icon {
  font-family: var(--smart-font-family-icon);
  font-size: var(--smart-font-size);
}

.smart-minus-icon::after {
  content: var(--smart-icon-minus);
}

.smart-plus-icon::after {
  content: var(--smart-icon-plus);
}

/* For Normal Editor */
/* smart-gantt-chart {
  height: auto;
  --smart-gantt-chart-task-default-height: 50px;
  --smart-gantt-chart-selection: rgba(0, 199, 181, 0.2);
  --smart-gantt-chart-selection-color: black;
  --smart-gantt-chart-hover: rgba(0, 199, 181, 0.2);
  --smart-gantt-chart-hover-color: black;
  --smart-gantt-chart-timeline-nonworking-color: repeating-linear-gradient(
    45deg,
    #ffadaf,
    #ffadaf 10px,
    #ff8181 10px,
    #ff8181 20px
  );
  --smart-gantt-chart-task-default-label-color: white;
}

smart-gantt-chart .john {
  --smart-gantt-chart-task-default-color: rgb(124, 175, 199);
}

smart-gantt-chart .jane {
  --smart-gantt-chart-task-default-color: rgb(124, 130, 199);
}

smart-gantt-chart .peter {
  --smart-gantt-chart-task-default-color: rgb(163, 124, 199);
}

smart-gantt-chart .melania {
  --smart-gantt-chart-task-default-color: rgb(199, 124, 190);
}

smart-gantt-chart .donald {
  --smart-gantt-chart-task-default-color: rgb(199, 124, 145);
} */
</style>