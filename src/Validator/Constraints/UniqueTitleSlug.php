<?php


namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 *
 * @author Magomed Deniev <magomed.deniev@gmail.com>
 */
class UniqueTitleSlug extends Constraint
{
    public $message = 'This {{ field }} already exists';

    public function validatedBy()
    {
        return \get_class($this).'Validator';
    }

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}
