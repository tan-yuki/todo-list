<?php
class TaskApiTest extends PHPUnit_Framework_TestCase {

	const TEST_USER_ID = 1;

	private $todo;

	protected function setUp() {
		$this->todo = new TODO();
		DB::init();
	}


	public function testGetAndSave () {
		$this->assertTrue(true);
	}
}
