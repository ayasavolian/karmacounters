from flask import Flask, render_template
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)

@app.route('/home')
def home(): 
	return render_template('home.html')

class CreateUser(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('email', type=str, help='Email address to create user')
            parser.add_argument('password', type=str, help='Password to create user')
            args = parser.parse_args()

            _userEmail = args['email']
            _userPassword = args['password']

            return {'Email': args['email'], 'Password': args['password']}

        except Exception as e:
            return {'error': str(e)}
    # def get():
    #     try:
    #         return {'a' : 1, 'b'}

api.add_resource(CreateUser, '/createuser')

if __name__ == "__main__":
    app.run(debug=True)

