from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def submit_review(request):
    """
    API view to submit product reviews (Issue #31)
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product_id = data.get('product_id')
            rating = data.get('rating')
            comment = data.get('comment')

            # Validation
            if not product_id or not rating or not comment:
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            # Success Response
            return JsonResponse({
                'message': 'Review submitted successfully!',
                'data': {
                    'product_id': product_id,
                    'rating': rating,
                    'comment': comment
                }
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed.'}, status=405)