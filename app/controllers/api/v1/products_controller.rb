class Api::V1::ProductsController < ApplicationController
  before_action :require_signin, except: [:index, :show]
  before_action :find_product, only: [:show, :update, :destroy]
  before_action :require_owner, only: [:update, :destroy]

  def index
    @products = Product.all
  end

  def show
  end


  def create
    @product = Product.new(product_params)
    @product.user_id = current_user.id
    unless @product.save
      render json: @product.errors.full_messages,
        status: :unprocessable_entity
    end
  end


  def update
    unless @product.update(product_params)
      render json: @product.errors.full_messages,
        status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
  end

  private

  def require_owner
    unless @product.owned_by?(current_user)
      render json: {error: "Access denied!"}, status: 403
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
