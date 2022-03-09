# DEVELOPER NOTES

- I am not sure if updating eslint/i18n config was part of the assignment. I used airBnb lint config that i use in my other projects and commented changes that I added or overrode
- Using redux is overkill... this project would be much better of with just react `useContext` hook or `react-recoil` as stateManagement.
  - **possible recoil setup**
  - atom family for filters (every section filter would be persisted)
  - separate states for todos and section -> using atom-selectors to pull todos for section
  - better state project structure (as described [here](https://wes-rast.medium.com/recoil-project-structure-best-practices-79e74a475caa))
- Using form management packages in this small project also isn't much beneficial. I mainly wanted to show that i can use them.
- Figma doesn't make sense in some scenarios
  - I should be displaying preview of a task description, but when opening `Edit task` modal, it displays as a title/task-name ?
  - Preview of `Edit section modal` ?
  - it would be cool to give the developer icon source + use only one icon source.
  - we were said to use chakra, yet the modal looks way to similar to bootstrap modal

### known issues

- displaying popover inside react-virtualized list.
  - this actually caused many related performance issues, since we cannot just give it a higher `z-index` or disable `overlow: hidden` on the list. so i decided to give the popover space inside the list instead
    - recalculating rowHeight and listHeight on every popover closing/opening action.
    - manually updating popover state
  - sometimes it still overflows a bit
- framer-motion animations
  - mainly, the animations can be way better organized, during section height animation, it can hide the `addSection` button, witch changes position instantly.
  - overall i could spend more time on synchronizing those transition etc. But as i said... its time consuming and this project should be focused on showing my way of thinking and solving logical problems. Not to shock you with flashy animations.

---

---

# Quick Overview

> This repository is built on [Create React App](https://github.com/facebook/create-react-app) with TypeScript configuration

> [Chakra UI](https://chakra-ui.com/) is installed as UI framework

> For unit testing, [Jest](https://jestjs.io/) is ready for you and for end-to-end testing it is [Cypress](https://www.cypress.io/)

> In the repository you will find a ready-made base for [Redux Toolkit](https://redux-toolkit.js.org/)

> You will use our prettier, eslint and typescript config for static testing - `npm run eslint && npm run prettify && npm run typecheck`

For quick start follow these commands

```sh
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000/) to see your app.<br>

## Why the assignment?

The assignment is one of three steps when we profile the applicant.<br>In this step we evaluate:

- `project architecture`
- `sense of clarity and ability to write readable code`
- `knowledge of best practicess`
- `visual design of the application`
- `programming skills`

## Why do I have to write code if I already sent you my code?

Simply your code was not sufficient. Since we want to give you a chance and want to see more from you, we ask you to write our assignment.<br>
We understand your time constraint, so our assignment should not take you much time.

# The assignment

Your task will be to write a `To Do List`.<br>
You might think a to do list isn't a challenge. <br>
That's right, that is why we're gonna make it littlebit harder.
<br>

You can use `Chakra UI` design system with our style theme. Which means that you will create the entire task based on the [Figma specification](https://www.figma.com/file/JoD25P1n4ALPTdt1wesM1S/Platforma-onboarding). You will also use the `Redux toolkit` and demonstrate its practical use.

The assignment will not be completely detailed, i.e. you will have to think about the details. How you handle it is up to you and we will grade you accordingly. You will be given a rough description, and figma specification.

1. First, you will create a header where you fill in your first and last name.<br><br>
2. Then you create a container where it will render a row, which will contain an add section button, which will `Add a section`. The row will wrap under itself as the screen shrinks. On a mobile device, each section will be below itself.<br><br>
3. Each section will contain a `section title` and a `settings button`. The settings will allow you to `mark all as done`, `edit`, or `delete list`. Each section will have a filter where you will be able to show `All`, `To do` or `Done` tasks. Each section will contain an `input component` with placeholder - "Add new task", where you will be able to enter the `task description` and then on onEnter save them.<br><br>
4. Each task will contain a title and a `more button`. The left border will be colored according to the `priority` of the task and the tasks will be ordered from highest to lowest priority. Clicking on the `more button` will open a popup where you can `Edit` the task or `Delete` the task.<br><br>
5. Under the header on the left side will be the `current date` (today) and on the right side will be the `filter` and `settings` button. In the filter button, the user will be able to `show all tasks`, `View completed tasks` or `View to-do items`. In the `settings` button the user will be able to `Clear all` or `Clear all done tasks`.<br><br>
6. In the task settings there is an option to `edit task`. When clicked, a modal window opens where the user can change the `task name` or `task description`. He can also specify the `priority` of the task.

## Important links

- [Figma specification](https://www.figma.com/file/JoD25P1n4ALPTdt1wesM1S/Platforma-onboarding)
- [Chakra UI](https://chakra-ui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)

### What we appreciate

- Do you know `Cypress` or `Jest`? Show yourself!
- `Chakra UI` is too easy for you, never mind... style your own using `Styled Components` or use `Tailwindcss`
- We do not require a strictly responsive UI. But you can make it
- We will be very happy if you use some library for animations

### Where we relieve

- You don't know the Redux Toolkit. Never mind, don't waste your time and use what you know.

That's it! Good luck!
