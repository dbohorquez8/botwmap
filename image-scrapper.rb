require 'open-uri'

# 0: 0, 0
# 1: 0, 1
# 2: 0, 3
# 3: 0, 6
# 4: 0, 13
# 5: 0, 27,25
# 6: 0, 55,51
# 7: 0, 110,102
# 8: 0, 220, 205

z = 6
x = 0
y = 0

until z > 6  do
  x = 8
  until x > 55  do
    y = 12
    until y > 51  do
      filename = "#{z}_#{x}_#{y}.png"
      open(filename, 'wb') do |file|
        file << open("https://zeldamaps.com/tiles/botw/hyrule/#{filename}").read
      end
      y +=1
    end
    x +=1
  end
  z +=1
end