from flask import Flask, request, json
from PathPlanner import getPoints
app = Flask(__name__)

@app.route("/", methods=['POST'])
def hello():
  data = json.loads(request.data)
  ox = [9.999999999976694, -12.922379128710304, -20.62692383645981, 3.8898199391468324,9.999999999976694]
  oy = [20.000000000000018, 21.072883605977033,-16.3521957397883, -27.72476196293283, 20.000000000000018]
  ox = data["ox"]
  oy = data["oy"]
  points = getPoints(ox, oy)
  return points

if __name__ == "__main__":
  app.run()