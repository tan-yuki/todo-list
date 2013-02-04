<?php

class DB {

	public function __construct () {

	}

	public static function init () {
		$dir = new DirectoryIterator('./testdata/');
		foreach ($dir as $file) {
			if ($file->getExtension() === 'json' && $file->isFile()) {
				$path = $file->getPathname();
				$dataset = json_decode(file_get_contents($path), true);

				$tablename = str_replace('.json', '', $file->getFilename());

				$record = ORM::for_table($tablename)->create();
				foreach ($dataset as $key => $val) {
					$record->set($key, $val);
				}
				$record->save();
			}
		}
	}
