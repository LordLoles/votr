
import json
import time
from datetime import datetime
from werkzeug.routing import Rule
from werkzeug.wrappers import Response
from werkzeug.exceptions import BadRequest
from . import sessions


def report(request):
    try:
        body = json.loads(request.get_data(as_text=True))
        type = request.args['type']
    except Exception as e:
        raise BadRequest(repr(e))

    payload = {
        'body': body,
        'type': type,
        'ua': request.user_agent.string,
        'sessid': sessions.get_session_cookie(request),
        'time': int(time.time()),
    }

    filename = datetime.utcnow().strftime('%Y%m')
    with open(request.app.var_path('reportlogs', filename), 'at') as f:
        f.write(json.dumps(payload, sort_keys=True) + '\n')
    return Response('OK', content_type='text/plain')


def get_routes():
    yield Rule('/report', methods=['POST'], endpoint=report)
