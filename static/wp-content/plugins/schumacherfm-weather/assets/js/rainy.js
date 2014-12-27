/*!
 * Copyright (c) 2013 Cyrill Schumacher
 * Licensed under the GPLv2 license
 */
;
jQuery(function ($) {
    if (1 !== isRaining) {
        return console.log('Error XML Weather API: ', isRaining);
    }

    var $featured = $('.featured');

    if ($featured.length === 0) {
        return;
    }

    var $heroImage = $featured.find('img').eq(0);
    var $heroA = $featured.find('a').eq(0);
    $heroImage.attr('id', 'heroImage');

    var engine = new RainyDay({
        element       : 'heroImage',
        parentElement : $heroA[0],
        blur          : 0,
        opacity       : 0.9,
        fps           : 30
    });
    engine.rain(
        [
            [1, 0, 15],
            [3, 3, 1]
        ],
        100);
    engine.trail = engine.TRAIL_SMUDGE;

});