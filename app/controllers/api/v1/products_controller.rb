class Api::V1::ProductsController < ApplicationController
  before_action :require_signin, except: [:index, :show]
  before_action :find_product, only: [:show]

  def index
    @products = Product.all
  end

  def show
  end


  def create
    @product = Product.new(product_params)
    @product.user_id = current_user
    unless @product.save
      render json: @product.errors.full_messages, status: :unprocessable_entity
    end
  end


  def update
  end

  def destroy
  end

  private

  def require_owner
    unless @product.owned_by?(current_user)
    end
  end

  def find_product
    begin
      @product = Product.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: {
        error: "The product you are looking for is sold out!"
        },status: 404
    end

  end

  def product_params
    params.require(:product).permit(
      :name, :price, :description, :image_url, :quantity
    )
  end
end
