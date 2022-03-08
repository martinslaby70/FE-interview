enum ActionTypes {
  // todo
  addTodo = 'addTodo',
  removeTodo = 'removeTodo',
  updateTodo = 'updateTodo',
  toggleTodoStatus = 'toggleTodoStatus',
  clearTodos = 'clearTodos',
  markAllAsDone = 'markAllAsDone',

  // section
  addSection = 'addSection',
  removeSection = 'removeSection',
  updateSection = 'updateSection',

  // user
  addUserName = 'addUserName',

  // filter
  filter = 'filter',
  invalidateFilter = 'invalidateFilter',

  // popover
  openPopover = 'openPopover',
  closePopover = 'closePopover',
}

export default ActionTypes;
