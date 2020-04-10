class Property < ApplicationRecord
  belongs_to :agent
  has_one :address

  # t.float "price"
  # t.boolean "sold"
  # t.float "sold_price"
  # t.integer "beds"
  # t.integer "baths"
  # t.integer "sq_ft"
  # t.bigint "agent_id"

  # SELECT id
  # FROM properties
  def self.available
    select("properties.id, beds, baths, sold, sq_ft,price, 
      ad.city, ad.zip, ad.street,
      a.first_name, a.last_name, a.email, a.id AS agent_id")
      .joins("INNER JOIN agents a ON a.id = properties.agent_id")
      .joins("INNER JOIN addresses ad ON ad.property_id = properties.id")
      .where("properties.sold <> TRUE")
      .order("a.id")
  end

  def self.by_city(city)
    select("properties.id, price, beds, baths, sq_ft")
      .joins("INNER JOIN addresses a ON a.property_id = properties.id")
      .where("LOWER(a.city) = ? AND properties.sold <> TRUE", city.downcase)
  end
end
