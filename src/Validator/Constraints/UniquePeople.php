<?php


namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 *
 * @author Magomed Deniev <magomed.deniev@gmail.com>
 */
class UniquePeople extends Constraint
{
    public $message = 'People with this {{ field }} already exists';

    public function validatedBy()
    {
        return \get_class($this).'Validator';
    }

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}
