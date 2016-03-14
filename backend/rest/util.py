import json
import datetime
import calendar

def rest_format(entity):
    """Serializer for rest entities."""

    if isinstance(entity, datetime.datetime):
        if entity.utcoffset() is not None:
            entity = entity - entity.utcoffset()

        return int(calendar.timegm(entity.timetuple()) * 1000 + entity.microsecond / 1000)
    elif isinstance(entity, list):
        return json.dumps([ob.__dict__ for ob in entity], default=rest_format)

    return json.dumps(entity.__dict__, default=rest_format)