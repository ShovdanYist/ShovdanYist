<?php


namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 *
 * @author Magomed Deniev <magomed@deniev.com>
 */
class BlockedEmail extends Constraint
{
    public $message = '{{ message }}';
    public $fields = [];

    public function validatedBy(): string
    {
        return \get_class($this).'Validator';
    }

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }

    public function getDefaultOption(): string
    {
        return 'fields';
    }
}
