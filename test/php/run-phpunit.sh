#!/bin/sh
php ../../vendor/phpunit/phpunit/phpunit.php \
  --include-path \
    '../../vendor/autoload.php' \
    './helper/DbHelper.php' \

