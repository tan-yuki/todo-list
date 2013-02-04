<?php

class TaskApi {

	/**
	 * Get task list
	 *
	 * @param  int      User id
	 * @return Array    Task object list
	 */
	public static function get ($userId) {
		$tasks = ORM::for_table('tasks')
			->select('tasks.*')
			->join('users', array('tasks.user_id', '=', 'users.id'))
			->where('users.id',  $userId)
			->find_array();

		return $tasks;
	}

	/**
	 * Save task data
	 *
	 * @param  Array    Task data
	 * @return Array    Error messages. If success saving, return null.
	 */
	public static function save ($data) {
		// error messages
		$errmsgs = array();

		// params
		$params = array();
		$params['user_id']     = $data['user_id'];
		$params['title']       = $data['title'];
		$params['description'] = $data['description'];

		foreach($params as $key => $val) {
			if (empty($val)) {
				array_push($errmsgs, "$key is not set");
			}
		}

		if (! empty($errmsgs)) {
			return $errmsgs;
		}

		$task = ORM::for_table('tasks')->create();
		$task->set('description', $params['description']);
		$task->set('title',       $params['title']);
		$task->set('user_id',     $params['user_id']);
		$task->set_expr('create_date', 'NOW()');
		$task->set_expr('update_date', 'NOW()');
		$task->save();

		return null;
	}
}

