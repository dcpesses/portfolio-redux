import projectsReducer, {
  ProjectsState,
  increment,
  decrement,
  selectItem,
  projectItemSelected,
  projectSelected,
  projectItems
} from './projectsSlice';

describe('projects reducer', () => {
  const projItem = (id:string|number|undefined) => ({
    title: `mockTitle${id}`,
    tags: [`mockTag${id}`],
    role: `mockRole${id}`,
    image: undefined,
    url: `mockUrl${id}`,
    description: `mockDescription${id}`
  });
  const initialState: ProjectsState = {
    items: [
      projItem('a'),
      projItem('b'),
      projItem('c')],
    selected: 2,
  };

  test('should handle initial state', () => {
    const actual = projectsReducer(undefined, { type: 'unknown' });
    expect(actual.selected).toEqual(0);
  });

  test('should increment when value within bounds', () => {
    const actual = projectsReducer(initialState, increment());
    expect(actual.selected).toEqual(3);
  });

  test('should not increment when value over bounds', () => {
    const lastItemSelectedState:ProjectsState = Object.assign({}, initialState, {
      selected: initialState.items.length - 1
    });
    const actual = projectsReducer(lastItemSelectedState, increment());
    expect(actual.selected).toEqual(3);
  });

  test('should decrement when value within bounds', () => {
    const actual = projectsReducer(initialState, decrement());
    expect(actual.selected).toEqual(1);
  });

  test('should not decrement when value over bounds', () => {
    const lastItemSelectedState:ProjectsState = Object.assign({}, initialState, {
      selected: 0
    });
    const actual = projectsReducer(lastItemSelectedState, decrement());
    expect(actual.selected).toEqual(0);
  });

  test('should handle selectItem when value within bounds', () => {
    const actual = projectsReducer(initialState, selectItem(1));
    expect(actual.selected).toEqual(1);
  });

  test('should return value of selected', () => {
    const actual = projectItemSelected({
      projects: initialState,
      todos: []
    });
    expect(actual).toEqual(initialState.items[initialState.selected]);
  });

  test('should return value of selected', () => {
    const actual = projectSelected({
      projects: initialState,
      todos: []
    });
    expect(actual).toEqual(2);
  });

  test('should return items', () => {
    const actual = projectItems({
      projects: initialState,
      todos: []
    });
    expect(actual).toEqual(initialState.items);
  });
});
