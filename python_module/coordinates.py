import math

class Coordinate(object):

	def __init__(self,min_x,min_y,max_x,max_y):
		self.min_x = min_x
		self.min_y = min_y
		self.max_x = max_x
		self.max_y = max_y

	# Totally dynamic method to quickly calculate centers of all coordinates
	def set_grid(self,x_size,y_size):
		self.x_size = x_size
		self.y_size = y_size
		self.incr_x = (self.max_x-self.min_x)/self.x_size
		self.x_points = []
		self.x_points.append((self.max_x-self.min_x)/(self.x_size*2))
		for i in range(self.x_size-1):
			self.x_points.append(self.x_points[i]+self.incr_x)
		self.incr_y = (self.max_y-self.min_y)/self.y_size
		self.y_points = []
		self.y_points.append((self.max_y-self.min_y)/(self.y_size*2))
		for i in range(self.y_size-1):
			self.y_points.append(self.y_points[i]+self.incr_y)
		print("X points")
		print(self.x_points)
		print("Y points")
		print(self.y_points)

	def get_coordinates(self):
		self.coordinates = [[j,i] for i in self.y_points for j in self.x_points]
		return self.coordinates

	def calculate_region(self,x,y):
		x = 0 if x<0 else x
		x = self.max_x if x>self.max_x else x
		y = 0 if y<0 else y
		y = self.max_y if y>self.max_y else y
		print(math.ceil(((y//self.incr_y)*self.x_size)+(x//self.incr_x+1)))
