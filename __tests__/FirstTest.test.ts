import UsersController from '@controllers/UsersController';

test('it should be ok', () => {
  const dale = UsersController;

  expect(dale).toEqual('dale');
});
