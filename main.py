from website import app
import os
import config

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=int(os.environ.get('PORT', 5000)))