from coordinates import Coordinate


# Getting all coordinates
c = Coordinate(0,0,1300,700)
c.set_grid(2,3)
points = c.get_coordinates()
print(points)

c.calculate_region(20,50)
c.calculate_region(350,50)
c.calculate_region(720,50)
c.calculate_region(1000,20)
c.calculate_region(20,350)
c.calculate_region(350,350)
c.calculate_region(720,350)
c.calculate_region(1000,350)

